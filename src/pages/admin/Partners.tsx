
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnerService, Partner } from '@/services/partners';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Trash2, Upload, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function PartnerManager() {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPartnerName, setNewPartnerName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Fetch Partners
    const { data: partners, isLoading } = useQuery({
        queryKey: ['partners'],
        queryFn: partnerService.fetchPartners,
    });

    // Create Partner Mutation
    const createMutation = useMutation({
        mutationFn: async () => {
            if (!selectedFile || !newPartnerName) throw new Error('Please provide name and logo');
            return await partnerService.createPartner(newPartnerName, selectedFile);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            toast.success('Partner added successfully');
            setNewPartnerName('');
            setSelectedFile(null);
            setIsDialogOpen(false);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    // Delete Partner Mutation
    const deleteMutation = useMutation({
        mutationFn: async (partner: Partner) => {
            await partnerService.deletePartner(partner.id, partner.logo_url);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            toast.success('Partner deleted successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Basic validation
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File too large. Max 2MB.");
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Partner Management</h2>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Partner
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Partner</DialogTitle>
                            <DialogDescription>
                                Upload a logo and enter the partner name.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Partner Name</Label>
                                <Input
                                    id="name"
                                    value={newPartnerName}
                                    onChange={(e) => setNewPartnerName(e.target.value)}
                                    placeholder="e.g. TACO HPL"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo">Logo (Max 2MB)</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required
                                        className="cursor-pointer"
                                    />
                                </div>
                                {selectedFile && (
                                    <p className="text-sm text-green-600">Selected: {selectedFile.name}</p>
                                )}
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={createMutation.isPending}>
                                    {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Partner
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {partners?.map((partner) => (
                        <Card key={partner.id} className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="aspect-video relative mb-4 flex items-center justify-center bg-gray-50 rounded-md p-4">
                                    <img
                                        src={partner.logo_url}
                                        alt={partner.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                                        <CardDescription className="text-xs text-gray-400">
                                            Added: {new Date(partner.created_at).toLocaleDateString()}
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this partner?')) {
                                                deleteMutation.mutate(partner);
                                            }
                                        }}
                                        disabled={deleteMutation.isPending}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {partners?.length === 0 && (
                        <div className="col-span-full text-center p-12 text-gray-500 border-2 border-dashed rounded-lg">
                            <p>No partners found. Add your first one!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
