import type React from "react";

interface EmailTemplateProps {
  inviteLink: string;
  role: keyof typeof roles;
}

const roles = {
  DEV: "Desenvolvedor",
  ADMIN: "administrador",
  MANAGER: "gerente",
  BILLING: "financeiro",
  MEMBER: "membro",
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  inviteLink,
  role,
}) => (
  <div>
    <p>
      Olá, você foi convidado(a) para ingressar na equipe como{" "}
      <strong>{roles[role]}</strong>.
    </p>
    <p>
      <a href={inviteLink}>Clique aqui</a> para se cadastrar.
    </p>
  </div>
);
