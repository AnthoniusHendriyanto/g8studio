import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { linkService, type QuickLink } from '@/services/links';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// Available Lucide icons for links
const AVAILABLE_ICONS = [
    'MessageCircle',
    'Briefcase',
    'MapPin',
    'ShoppingBag',
    'Instagram',
    'Facebook',
    'Twitter',
    'Linkedin',
    'Youtube',
    'Mail',
    'Phone',
    'Globe',
    'Link',
    'ExternalLink',
];

const LinkManager = () => {
    const queryClient = useQueryClient();
    const [isAdding, setIsAdding] = useState(false);
    const [newLink, setNewLink] = useState({
        title: '',
        url: '',
        icon_name: 'Link',
        color: '#FF6B35',
        order_index: 0,
        is_active: true,
    });

    // Fetch all links
    const { data: links, isLoading } = useQuery({
        queryKey: ['quick-links-admin'],
        queryFn: linkService.fetchAllLinks,
    });

    // Create mutation
    const createMutation = useMutation({
        mutationFn: linkService.createLink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quick-links-admin'] });
            toast.success('Link added successfully!');
            setIsAdding(false);
            setNewLink({
                title: '',
                url: '',
                icon_name: 'Link',
                color: '#FF6B35',
                order_index: 0,
                is_active: true,
            });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to add link');
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: linkService.deleteLink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quick-links-admin'] });
            toast.success('Link deleted successfully!');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete link');
        },
    });

    // Toggle active mutation
    const toggleMutation = useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            linkService.toggleActive(id, isActive),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quick-links-admin'] });
            toast.success('Link visibility updated!');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update link');
        },
    });

    const handleCreate = () => {
        if (!newLink.title || !newLink.url) {
            toast.error('Please fill in all required fields');
            return;
        }
        createMutation.mutate(newLink);
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quick Links Manager</h1>
                    <p className="text-muted-foreground">Manage your Linktree-style quick links</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                </Button>
            </div>

            {/* Add Link Form */}
            {isAdding && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Link</CardTitle>
                        <CardDescription>Create a new quick link for your links page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                placeholder="Chat on WhatsApp"
                                value={newLink.title}
                                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                disabled={createMutation.isPending}
                            />
                        </div>

                        <div>
                            <Label htmlFor="url">URL *</Label>
                            <Input
                                id="url"
                                placeholder="https://wa.me/628111906879"
                                value={newLink.url}
                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                disabled={createMutation.isPending}
                            />
                        </div>

                        <div>
                            <Label htmlFor="icon">Icon</Label>
                            <Select
                                value={newLink.icon_name}
                                onValueChange={(value) => setNewLink({ ...newLink, icon_name: value })}
                                disabled={createMutation.isPending}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_ICONS.map((icon) => (
                                        <SelectItem key={icon} value={icon}>
                                            {icon}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <div>
                                <Label htmlFor="color">Color (Hex)</Label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Input
                                            id="color"
                                            placeholder="#FF6B35"
                                            value={newLink.color}
                                            onChange={(e) => setNewLink({ ...newLink, color: e.target.value })}
                                            disabled={createMutation.isPending}
                                        />
                                    </div>
                                    <div className="relative w-12 h-10 overflow-hidden rounded border cursor-pointer">
                                        <input
                                            type="color"
                                            className="absolute -inset-1 w-[150%] h-[150%] cursor-pointer"
                                            value={newLink.color.startsWith('#') && newLink.color.length === 7 ? newLink.color : '#000000'}
                                            onChange={(e) => setNewLink({ ...newLink, color: e.target.value.toUpperCase() })}
                                            disabled={createMutation.isPending}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="order">Order Index</Label>
                            <Input
                                id="order"
                                type="number"
                                value={newLink.order_index}
                                onChange={(e) =>
                                    setNewLink({ ...newLink, order_index: parseInt(e.target.value) || 0 })
                                }
                                disabled={createMutation.isPending}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={newLink.is_active}
                                onCheckedChange={(checked) => setNewLink({ ...newLink, is_active: checked })}
                                disabled={createMutation.isPending}
                            />
                            <Label htmlFor="is_active">Active (visible on links page)</Label>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleCreate} disabled={createMutation.isPending}>
                                {createMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Link'
                                )}
                            </Button>
                            <Button variant="outline" onClick={() => setIsAdding(false)}>
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Links List */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Current Links ({links?.length || 0})</h2>
                {links && links.length > 0 ? (
                    links.map((link) => (
                        <Card key={link.id} className={!link.is_active ? 'opacity-50' : ''}>
                            <CardContent className="p-4">
                                <div className="flex gap-4 items-center">
                                    <div className="flex-shrink-0">
                                        <GripVertical className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                                        style={{ backgroundColor: link.color }}
                                    >
                                        <span className="text-xs">{link.icon_name.slice(0, 2)}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{link.title}</h3>
                                        <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                                        <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                                            <span>Order: {link.order_index}</span>
                                            <span>• Icon: {link.icon_name}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                toggleMutation.mutate({ id: link.id, isActive: !link.is_active })
                                            }
                                            disabled={toggleMutation.isPending}
                                        >
                                            {link.is_active ? (
                                                <>
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Visible
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="h-4 w-4 mr-1" />
                                                    Hidden
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteMutation.mutate(link.id)}
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
                            No links yet. Click "Add Link" to create your first quick link!
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default LinkManager;
