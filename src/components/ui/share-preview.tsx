"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SharePreviewProps {
    resource: {
        id: string;
        title: string;
        description: string;
        type: string;
        image?: string;
        areas?: Array<{ area: { name: string } }>;
    };
    onCopy?: () => void;
}

export function SharePreview({ resource, onCopy }: SharePreviewProps) {
    const [copied, setCopied] = useState(false);

    const generateShareText = (): string => {
        const resourceUrl = `${window.location.origin}/resource/${resource.id}`;

        return `🎯 ${resource.title}

${resource.description}

📚 Tipo: ${resource.type}${resource.areas && resource.areas.length > 0
                ? `\n🏷️ Área: ${resource.areas[0].area.name}`
                : ''
            }

🔗 Ver recurso: ${resourceUrl}`;
    };

    const handleCopy = async () => {
        try {
            const shareText = generateShareText();
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            toast.success("¡Texto copiado al portapapeles!");
            onCopy?.();
            setTimeout(() => setCopied(false), 3000);
        } catch (error) {
            toast.error("Error al copiar el texto");
        }
    };

    return (
        <div className="space-y-4">
            {/* Preview del recurso */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                    {resource.image && (
                        <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm line-clamp-2">
                            {resource.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {resource.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                                {resource.type}
                            </Badge>
                            {resource.areas && resource.areas.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                    {resource.areas[0].area.name}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Texto que se va a compartir */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium">Texto que se compartirá:</h4>
                <div className="bg-muted/30 rounded-lg p-3 text-sm whitespace-pre-line border">
                    {generateShareText()}
                </div>
            </div>

            {/* Botón de copiar */}
            <Button
                onClick={handleCopy}
                className="w-full justify-start"
                variant={copied ? "default" : "outline"}
            >
                {copied ? (
                    <>
                        <Check className="h-4 w-4 mr-2" />
                        ¡Texto copiado!
                    </>
                ) : (
                    <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar texto para compartir
                    </>
                )}
            </Button>

            {/* Instrucciones */}
            <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
                <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                    💡 Instrucciones:
                </p>
                <p>1. Haz clic en "Copiar texto"</p>
                <p>2. Abre Instagram (app o web)</p>
                <p>3. Ve a tu historia o mensaje directo</p>
                <p>4. Pega el texto (Ctrl+V o Cmd+V)</p>
                <p>5. ¡Publica y comparte!</p>
            </div>
        </div>
    );
}
