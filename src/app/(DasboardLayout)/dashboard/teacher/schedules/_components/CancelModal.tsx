import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export function CancelModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-lg p-5">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-gray-900">
            Cancel Class
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-500 mt-1">
          Please provide a reason for cancelling this class
        </p>

        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for cancellation"
          className="mt-3 border-gray-200 text-sm"
        />

        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            Note: Cancelling within 24 hours may affect your standing.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={!reason.trim()}
            onClick={() => {
              onSubmit(reason);
              setReason("");
            }}
          >
            Submit Cancellation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
