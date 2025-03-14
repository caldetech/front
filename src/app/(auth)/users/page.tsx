import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Users() {
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Funcionários</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute top-8 right-8" variant={"outline"}>
              Adicionar
            </Button>
          </DialogTrigger>

          <DialogContent className="w-auto">
            <DialogHeader>
              <DialogTitle>Adicionar funcionário</DialogTitle>
              {/* <DialogDescription>
              Crie um novo usuário  
            </DialogDescription> */}
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col w-full gap-1">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>

                <Input
                  className=""
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <Label htmlFor="number" className="text-right">
                  Número
                </Label>

                <InputOTP
                  maxLength={11}
                  className="w-full"
                  id="number"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                    <InputOTPSlot index={8} />
                    <InputOTPSlot index={9} />
                    <InputOTPSlot index={10} />
                  </InputOTPGroup>
                </InputOTP>

                {/* <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} className="" /> */}
              </div>

              <div className="flex flex-col w-full gap-1">
                <Label htmlFor="email" className="text-right">
                  E-mail
                </Label>
                <Input
                  id="email"
                  className=""
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <Label htmlFor="role" className="text-right">
                  Função
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Função</SelectLabel>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <TableHead>Nome</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Celular</TableHead>
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
                  Kelven Souza
                </TableCell>

                <TableCell>Desenvolvedor</TableCell>

                <TableCell className="font-medium">(16) 99407-2920</TableCell>

                <TableCell className="font-medium">Ativo</TableCell>

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
