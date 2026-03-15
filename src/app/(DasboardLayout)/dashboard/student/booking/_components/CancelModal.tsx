import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export function CancelModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm rounded-md p-5">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-gray-900">
            Cancel Class
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mt-1">
          Are you sure you want to cancel this class?
        </p>

        <div className="flex items-start gap-2 mt-2">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            Cancelling within 24 hours will not refund your credit.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={onClose}>
            Go Back
          </Button>
          <Button size="sm" variant="destructive" onClick={onConfirm}>
            Yes, Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
