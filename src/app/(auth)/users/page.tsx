import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

export default function Users() {
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

      <div className="space-y-2.5">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Identificador</TableHead>
                <TableHead>Realizado há</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total do pedido</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Button variant={"outline"} size={"xs"}>
                    <Search className="h-3 w-3" />

                    <span className="sr-only">Detalhes do pedido</span>
                  </Button>
                </TableCell>

                <TableCell className="font-mono text-xs font-medium">
                  csacsacsa
                </TableCell>

                <TableCell className="text-muted-foreground">
                  ascascsacascas
                </TableCell>

                <TableCell>
                  sefewfwefe
                </TableCell>

                <TableCell className="font-medium">
                  qwdqwdwqd
                </TableCell>

                <TableCell className="font-medium">
                  10
                </TableCell>

                {/* <TableCell>
                    <Button
                      variant={"outline"}
                      size={"xs"}
                    >
                      <ArrowRight className="w-3 h-3 mr-2" />
                      Aprovar
                    </Button>
                </TableCell>

                <TableCell>
                  <Button
                    variant={"ghost"}
                    size={"xs"}
                  >
                    <X className="w-3 h-3 mr-2" />
                    Cancelar
                  </Button>
                </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
