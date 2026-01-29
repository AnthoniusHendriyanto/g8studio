import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService, PortfolioItem } from '@/services/portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Trash2, Plus, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CATEGORIES = ['Residential', 'Commercial', 'Office', 'Retail', 'Hospitality'];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
        case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Concept': return 'bg-amber-100 text-amber-800 border-amber-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export default function PortfolioManager() {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [client, setClient] = useState('');
    const [status, setStatus] = useState('Completed');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    // Keep track of existing images for edit mode (to not lose them if no new files)
    const [existingImages, setExistingImages] = useState<string[]>([]);

    // Fetch Portfolio Items
    const { data: projects, isLoading } = useQuery({
        queryKey: ['portfolio'],
        queryFn: portfolioService.fetchProjects,
    });

    // Create Project Mutation
    const createMutation = useMutation({
        mutationFn: async () => {
            if (!title || !category || !year || selectedFiles.length === 0) {
                throw new Error('Please fill all fields and upload at least one image');
            }
            return await portfolioService.createProject(title, category, year, description, location, client, status, selectedFiles);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
            toast.success('Project added successfully');
            resetForm();
            setIsDialogOpen(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    // Update Project Mutation
    const updateMutation = useMutation({
        mutationFn: async () => {
            if (!editId) throw new Error("No project ID for update");

            // For now, we only update text fields. 
            // supporting image updates would require more complex logic (deleting old, uploading new, or appending)
            // Simplicity: If new files are selected, we ideally upload them.
            // BUT for this 'Update Status' request, let's focus on text updates.
            // If the user wants to change images, they might need to delete/re-add or we build full image management later.
            // If we want to support image *replacement*, we need to know if they provided new files.

            if (selectedFiles.length > 0) {
                toast.info("Image update not fully supported in this quick edit yet. Only text fields updated.");
                // In a full implementation, we'd upload new files here and update the 'images' array.
            }

            return await portfolioService.updateProject(editId, {
                title,
                category,
                year,
                description,
                location,
                client,
                status
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
            toast.success('Project updated successfully');
            resetForm();
            setIsDialogOpen(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    // Delete Project Mutation
    const deleteMutation = useMutation({
        mutationFn: async (project: PortfolioItem) => {
            await portfolioService.deleteProject(project.id, project.images);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
            toast.success('Project deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            // Validate
            for (const file of filesArray) {
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`${file.name} is too large. Max 5MB per image.`);
                    return;
                }
            }

            setSelectedFiles(filesArray);

            // Create preview URLs
            const urls = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    };

    const removePreview = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setPreviewUrls(newUrls);
    };

    const resetForm = () => {
        setTitle('');
        setCategory('');
        setYear('');
        setDescription('');
        setLocation('');
        setClient('');
        setStatus('Completed');
        setSelectedFiles([]);
        setPreviewUrls([]);
        setExistingImages([]);
        setIsEditing(false);
        setEditId(null);
    };

    const handleEdit = (project: PortfolioItem) => {
        setTitle(project.title);
        setCategory(project.category);
        setYear(project.year);
        setDescription(project.description);
        setLocation(project.location || '');
        setClient(project.client || '');
        setStatus(project.status || 'Completed');
        setExistingImages(project.images);
        setEditId(project.id);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            updateMutation.mutate();
        } else {
            createMutation.mutate();
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) resetForm();
        setIsDialogOpen(open);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Portfolio Management</h2>

                <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>
                        <Button onClick={() => resetForm()}>
                            <Plus className="mr-2 h-4 w-4" /> Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                            <DialogDescription>
                                {isEditing ? 'Update the project details.' : 'Fill in the project details and upload images.'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title *</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Modern Living Room Renovation"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={category} onValueChange={setCategory} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Year *</Label>
                                    <Input
                                        id="year"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        placeholder="e.g. 2024"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Concept">Concept</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="e.g. Bandung"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="client">Client</Label>
                                    <Input
                                        id="client"
                                        value={client}
                                        onChange={(e) => setClient(e.target.value)}
                                        placeholder="e.g. Private"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief description of the project..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="images">
                                    {isEditing ? 'Add New Images (Optional)' : 'Images * (Max 5MB each)'}
                                </Label>
                                <Input
                                    id="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    required={!isEditing} // Required only for new projects
                                    className="cursor-pointer"
                                />
                                {selectedFiles.length > 0 && (
                                    <p className="text-sm text-green-600">{selectedFiles.length} file(s) selected</p>
                                )}
                            </div>

                            {/* Image Previews - Existing */}
                            {isEditing && existingImages.length > 0 && previewUrls.length === 0 && (
                                <div className="space-y-2">
                                    <Label>Current Images</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {existingImages.map((url, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={url}
                                                    alt={`Existing ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-md"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Image Previews - New */}
                            {previewUrls.length > 0 && (
                                <div className="grid grid-cols-3 gap-4">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePreview(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isEditing ? 'Update Project' : 'Save Project'}
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
                    {projects?.map((project) => (
                        <Card key={project.id} className="overflow-hidden flex flex-col">
                            <div className="aspect-video relative bg-gray-100 group">
                                {project.images.length > 0 && (
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className={`text-xs px-2 py-1 rounded font-medium border ${getStatusColor(project.status || 'Completed')}`}>
                                        {project.status || 'Completed'}
                                    </span>
                                </div>
                            </div>
                            <CardContent className="p-4 flex-1 flex flex-col">
                                <div className="flex-1">
                                    <CardTitle className="text-lg mb-1">{project.title}</CardTitle>
                                    <div className="flex gap-2 text-xs text-gray-500 mb-2">
                                        <span className="bg-gray-100 px-2 py-1 rounded">{project.category}</span>
                                        <span className="bg-gray-100 px-2 py-1 rounded">{project.year}</span>
                                    </div>
                                    {project.description && (
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{project.description}</p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 mt-auto pt-2 border-t">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(project)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this project?')) {
                                                deleteMutation.mutate(project);
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

                    {projects?.length === 0 && (
                        <div className="col-span-full text-center p-12 text-gray-500 border-2 border-dashed rounded-lg">
                            <p>No projects found. Add your first one!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
