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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Customers() {
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute top-8 right-8" variant={"outline"}>
              Adicionar
            </Button>
          </DialogTrigger>

          <DialogContent className="w-auto">
            <DialogHeader>
              <DialogTitle>Adicionar cliente</DialogTitle>
              {/* <DialogDescription>
              Crie um novo usuário  
            </DialogDescription> */}
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <RadioGroup
                defaultValue="person"
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="person" id="r2" />
                  <Label htmlFor="r2">Física</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="r1" />
                  <Label htmlFor="r1">Jurídica</Label>
                </div>
              </RadioGroup>

              <div className="flex flex-col gap-1">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>

                <Input
                  id="name"
                  className=""
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="cpf" className="text-right">
                  CPF
                </Label>

                <InputOTP
                  maxLength={11}
                  className="w-full"
                  id="number"
                >
                  <InputOTPGroup className="flex flex-wrap gap-1">
                    {Array.from({ length: 11 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* {customerType === "company" && (
                <div>
                  <Label htmlFor="cnpj" className="text-right">
                    CNPJ
                  </Label>

                  <InputOTP
                    maxLength={14}
                    className="w-full"
                    id="number"
                    value={identification}
                    onChange={(e) => setIdentification(e)}
                  >
                    <InputOTPGroup className="flex flex-wrap gap-1">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )} */}

              <div className="flex flex-col gap-1">
                <Label htmlFor="address" className="text-right">
                  Endereço
                </Label>

                <Input
                  id="address"
                  className=""
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="number" className="text-right">
                  Contato (Principal)
                </Label>

                <InputOTP
                  maxLength={11}
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
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="contact" className="text-right">
                  Contato (Recado)
                </Label>

                <InputOTP
                  maxLength={11}
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
                <TableHead>Endereço</TableHead>
                <TableHead>Contato (Principal)</TableHead>
                <TableHead>Contato (Recado)</TableHead>
                <TableHead>Tipo</TableHead>
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

                <TableCell>
                  <p>R. Expedicionário Solano, 3379 - Jardim Esplanada</p>
                </TableCell>

                <TableCell className="font-medium">(16) 99407-2920</TableCell>

                <TableCell className="font-medium">(16) 99125-1494</TableCell>

                <TableCell className="font-medium">Física</TableCell>

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
