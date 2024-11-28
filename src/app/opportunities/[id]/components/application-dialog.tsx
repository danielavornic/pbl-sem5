import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FileUploader } from "@/components/ui/file-uploader";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UploadedFilesCard } from "@/components/ui/uploaded-files-card";
import { SessionExtended } from "@/types/opportunity";

import { useCreateApplication } from "../hooks/use-create-application";

interface ApplicationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  opportunityId: number;
  sessions: SessionExtended[];
}

const ApplicationDialog = ({
  isOpen,
  setIsOpen,
  opportunityId,
  sessions
}: ApplicationDialogProps) => {
  const { form, onSubmit, isPending, isUploading, progresses, uploadedFiles } =
    useCreateApplication({
      opportunityId,
      sessions: sessions.map((session) => session.id),
      onSuccess: () => setIsOpen(false)
    });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Aplică</DialogTitle>
          <DialogDescription>
            Completează formularul de mai jos pentru a aplica la această oportunitate.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesaj (opțional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrie motivația ta pentru această oportunitate..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documente atașate</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFileCount={1}
                      maxSize={5 * 1024 * 1024}
                      progresses={progresses}
                      disabled={isUploading}
                    />
                  </FormControl>
                  {uploadedFiles.length > 0 && <UploadedFilesCard uploadedFiles={uploadedFiles} />}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" loading={isPending || isUploading}>
                {isPending || isUploading ? "Se trimite..." : "Trimite aplicația"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
