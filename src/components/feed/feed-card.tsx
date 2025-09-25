"use client";

import { ResourceDTO } from "@/interface/resource";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Play,
  FileText,
  Image as ImageIcon,
  Heart,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ResourcePreviewSheet from "../resource/create-resource/resource-preview-sheet";

interface FeedCardProps {
  post: ResourceDTO;
  onPostDeleted?: (postId: string) => void;
}

export function FeedCard({ post, onPostDeleted }: FeedCardProps) {
  const [previewPost, setPreviewPost] = useState<ResourceDTO | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 100));
  const router = useRouter();

  const handlePreview = (post: ResourceDTO) => {
    setPreviewPost(post);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleViewFull = () => {
    router.push(`/resource/${post.id}`);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Play className="h-4 w-4" />;
      case "Text":
        return <FileText className="h-4 w-4" />;
      case "Slides":
        return <ImageIcon className="h-4 w-4" />;
      case "Infography":
        return <ImageIcon className="h-4 w-4" />;
      case "Podcast":
        return <Play className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case "Video":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "Text":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Slides":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Infography":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "Podcast":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <>
      <div className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Post Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/default-avatar.png" alt="User" />
                <AvatarFallback className="text-sm font-medium">
                  {post.authorId.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    u/{post.authorId}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {post.type}
                  </Badge>
                  {post.areas && post.areas.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {post.areas[0].area.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-4">
          <h3
            className="text-lg font-semibold mb-3 line-clamp-2 cursor-pointer hover:text-persian-green transition-colors"
            onClick={handleViewFull}
          >
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {post.description}
          </p>

          {/* Resource Preview */}
          {(post.image || post.attachment) && (
            <div className="mb-4">
              <div
                className="relative group cursor-pointer"
                onClick={() => handlePreview(post)}
              >
                {post.image ? (
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="h-5 w-5 text-white" />
                        <span className="text-white text-sm font-medium">
                          Ver recurso
                        </span>
                      </div>
                    </div>
                  </div>
                ) : post.attachment ? (
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center group-hover:border-persian-green/50 transition-colors">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 rounded-full bg-persian-green/10">
                        {getResourceIcon(post.type)}
                      </div>
                      <span className="text-sm font-medium">Ver recurso</span>
                      <Badge className={getResourceTypeColor(post.type)}>
                        {post.type}
                      </Badge>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.areas && post.areas.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.areas.slice(0, 3).map((areaWrapper, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {areaWrapper.area.name}
                </Badge>
              ))}
              {post.areas.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.areas.length - 3} más
                </Badge>
              )}
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 px-3 ${
                    isLiked
                      ? "text-red-500 hover:text-red-600"
                      : "hover:text-red-500"
                  }`}
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                  />
                </Button>
                <span className="text-sm font-medium px-1">{likesCount}</span>
              </div>

              <Button variant="ghost" size="sm" className="h-8 px-3">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">Comentar</span>
              </Button>

              <Button variant="ghost" size="sm" className="h-8 px-3">
                <Share2 className="h-4 w-4 mr-1" />
                <span className="text-sm">Compartir</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-3">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3"
                onClick={handleViewFull}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Preview Sheet */}
      {previewPost && (
        <ResourcePreviewSheet
          open={!!previewPost}
          onClose={() => setPreviewPost(null)}
          attachment={previewPost.attachment}
          title={previewPost.title}
          description={previewPost.description}
        />
      )}
    </>
  );
}
