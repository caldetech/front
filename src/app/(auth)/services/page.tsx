import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function Services() {
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <p className="hidden sm:flex">Adicionar</p>

              <Plus className="sm:hidden" />
            </Button>
          </DialogTrigger>

          <DialogContent className="min-w-3xs">
            <DialogHeader>
              <DialogTitle>Adicionar serviço</DialogTitle>
              {/* <DialogDescription>
              Crie um novo usuário  
            </DialogDescription> */}
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name" className="text-right">
                  Título
                </Label>

                <Input
                  id="name"
                  className=""
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="description" className="text-right">
                  Descrição
                </Label>

                <Textarea className="text-right">
                </Textarea>
              </div>
            </div>

            <DialogFooter>
              <Button>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2.5">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead></TableHead> */}
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                {/* <TableCell>
                  <Button variant={"outline"} size={"xs"}>
                    <Eye className="h-3 w-3" />

                    <span className="sr-only">Detalhes do pedido</span>
                  </Button>
                </TableCell> */}

                <TableCell className="text-muted-foreground">
                  Instalação de câmera
                </TableCell>

                <TableCell>
                 Instalação de câmera com...
                </TableCell>

                <TableCell>
                 Ativo
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
