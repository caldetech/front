import { z } from "zod";

export const customProductSchema = z.object({
  id: z.number(),
  nome: z.string(),
  codigo: z.string(),
  preco: z.number(),
  precoCusto: z.number(),
  estoque: z.any(),
  tipo: z.string(),
  situacao: z.string(),
  formato: z.string(),
  descricaoCurta: z.string(),
  imagemURL: z.string(),
  quantity: z.number(),
});

export const CustomProductResponseSchema = z.object({
  data: z.array(customProductSchema),
});

export type Product = z.infer<typeof customProductSchema>;
export type ProductResponse = z.infer<typeof CustomProductResponseSchema>;
