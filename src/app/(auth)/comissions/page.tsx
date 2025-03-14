import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";

export default function Comissions() {
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Comissões</h1>

        <Button className="absolute top-8 right-8" variant={"outline"}>
          Adicionar
        </Button>
      </div>

      <div className="space-y-2.5">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Percentual</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"} size={"xs"}>
                        <Eye className="h-3 w-3" />

                        <span className="sr-only">Detalhes do pedido</span>
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ordem: #357</DialogTitle>

                        <DialogDescription>
                          Detalhes
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-muted-foreground">
                                Status
                              </TableCell>

                              <TableCell className="flex justify-end">
                                Concluída
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell className="text-muted-foreground">
                                Cliente
                              </TableCell>

                              <TableCell className="flex justify-end">
                                José Amaral dos Santos
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell className="text-muted-foreground">
                                Telefone
                              </TableCell>

                              <TableCell className="flex justify-end">
                                (16) 99407-2920
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell className="text-muted-foreground">
                                Data
                              </TableCell>

                              <TableCell className="flex justify-end">
                                02/03/2024
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell className="text-muted-foreground">
                                Funcionários
                              </TableCell>

                              <TableCell className="flex justify-end gap-1">
                                <span className="bg-gray-100 rounded-4xl px-2 py-1 flex items-center justify-center">Kelven</span>
                                <span className="bg-gray-100 rounded-4xl px-2 py-1 flex items-center justify-center">Edson</span>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Serviço</TableHead>

                              <TableHead className="text-right">
                                Qtd.
                              </TableHead>

                              <TableHead className="text-right">
                                Preço
                              </TableHead>

                              <TableHead className="text-right">
                                Subtotal
                              </TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            <TableRow>
                              <TableCell>Instalação de câmera</TableCell>

                              <TableCell className="text-right">
                                -
                              </TableCell>

                              <TableCell className="text-right">
                                R$ 4.499,99
                              </TableCell>

                              <TableCell className="text-right">
                                R$ 4.499,99
                              </TableCell>
                            </TableRow>
                          </TableBody>

                          <TableFooter>
                            <TableRow>
                              <TableCell colSpan={3}>
                                Total do pedido
                              </TableCell>

                              <TableCell className="text-right font-medium">
                                R$ 4.499,99
                              </TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>

                <TableCell className="font-mono text-xs font-medium">
                  02/03/2024
                </TableCell>

                <TableCell className="text-muted-foreground">
                  Kelven
                </TableCell>

                <TableCell>5%</TableCell>

                <TableCell className="font-medium">R$ 249,99</TableCell>

                <TableCell className="font-medium">Pago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
