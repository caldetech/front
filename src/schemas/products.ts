import { z } from "zod";

export const productSchema = z.object({
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

export const ProductResponseSchema = z.object({
  data: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
