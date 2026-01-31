import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { heroService, type HeroSlide } from '@/services/hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Upload, Trash2, GripVertical } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const HeroManager = () => {
    const queryClient = useQueryClient();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [newSlide, setNewSlide] = useState({
        title: '',
        subtitle: '',
        order_index: 0,
        use_random: false,
        is_global_text: false,
    });

    // Fetch all slides
    const { data: slides, isLoading } = useQuery({
        queryKey: ['hero-slides'],
        queryFn: heroService.fetchSlides,
    });

    // Upload mutation
    const uploadMutation = useMutation({
        mutationFn: async () => {
            if (!selectedFile) throw new Error('No file selected');
            const imageUrl = await heroService.uploadImage(selectedFile);
            return heroService.createSlide({
                ...newSlide,
                image_url: imageUrl,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
            toast.success('Hero slide added successfully!');
            setSelectedFile(null);
            setNewSlide({
                title: '',
                subtitle: '',
                order_index: 0,
                use_random: false,
                is_global_text: false,
            });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to upload slide');
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (slide: HeroSlide) => {
            await heroService.deleteImage(slide.image_url);
            await heroService.deleteSlide(slide.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
            toast.success('Slide deleted successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete slide');
        },
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<HeroSlide> }) =>
            heroService.updateSlide(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
            toast.success('Slide updated successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update slide');
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            toast.error('Please select an image first');
            return;
        }
        uploadMutation.mutate();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Hero Slider Manager</h1>
                <p className="text-muted-foreground">
                    Manage homepage hero images and text overlays
                </p>
            </div>

            {/* Upload Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Slide</CardTitle>
                    <CardDescription>Upload an image and configure the overlay text</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="image">Hero Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploadMutation.isPending}
                        />
                    </div>

                    <div>
                        <Label htmlFor="title">Title (Optional)</Label>
                        <Input
                            id="title"
                            placeholder="Designing Dreams, Building Reality"
                            value={newSlide.title}
                            onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                            disabled={uploadMutation.isPending}
                        />
                    </div>

                    <div>
                        <Label htmlFor="subtitle">Subtitle (Optional)</Label>
                        <Input
                            id="subtitle"
                            placeholder="Premium interior design solutions..."
                            value={newSlide.subtitle}
                            onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                            disabled={uploadMutation.isPending}
                        />
                    </div>

                    <div>
                        <Label htmlFor="order">Order Index</Label>
                        <Input
                            id="order"
                            type="number"
                            value={newSlide.order_index}
                            onChange={(e) =>
                                setNewSlide({ ...newSlide, order_index: parseInt(e.target.value) || 0 })
                            }
                            disabled={uploadMutation.isPending}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="use_random"
                            checked={newSlide.use_random}
                            onCheckedChange={(checked) => setNewSlide({ ...newSlide, use_random: checked })}
                            disabled={uploadMutation.isPending}
                        />
                        <Label htmlFor="use_random">Use Random Order</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="is_global"
                            checked={newSlide.is_global_text}
                            onCheckedChange={(checked) =>
                                setNewSlide({ ...newSlide, is_global_text: checked })
                            }
                            disabled={uploadMutation.isPending}
                        />
                        <Label htmlFor="is_global">Use as Global Text (same for all slides)</Label>
                    </div>

                    <Button onClick={handleUpload} disabled={uploadMutation.isPending || !selectedFile}>
                        {uploadMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Slide
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Slides List */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Current Slides ({slides?.length || 0})</h2>
                {slides && slides.length > 0 ? (
                    slides.map((slide) => (
                        <Card key={slide.id}>
                            <CardContent className="p-4">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <GripVertical className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <img
                                        src={slide.image_url}
                                        alt={slide.title || 'Hero slide'}
                                        className="w-32 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {slide.title || <span className="text-muted-foreground">No title</span>}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {slide.subtitle || 'No subtitle'}
                                        </p>
                                        <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                                            <span>Order: {slide.order_index}</span>
                                            {slide.use_random && <span className="text-accent">• Random</span>}
                                            {slide.is_global_text && (
                                                <span className="text-primary">• Global Text</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                updateMutation.mutate({
                                                    id: slide.id,
                                                    updates: { is_global_text: !slide.is_global_text },
                                                })
                                            }
                                        >
                                            {slide.is_global_text ? 'Unset Global' : 'Set Global'}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteMutation.mutate(slide)}
                                            disabled={deleteMutation.isPending}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            No slides yet. Upload your first hero image above!
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default HeroManager;
