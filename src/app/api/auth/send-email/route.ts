import { EmailTemplate } from "@/components/EmailTemplate";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const { recipientEmail, role, inviteLink } = await request.json();

    if (!recipientEmail || !role || !inviteLink) {
      return Response.json(
        {
          error: "Campos obrigatórios ausentes!",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Caldetech <noreply@caldetech.com.br>",
      to: recipientEmail,
      subject: "Convite para plataforma de gestão da empresa",
      react: await EmailTemplate({ role, inviteLink }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
