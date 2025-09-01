# 📚 MicroLearn

> Una plataforma educativa moderna diseñada para estudiantes y profesores.  
> Minimalista, rápida y construida con tecnologías web de vanguardia.

---

## ✨ Características principales

- 🔐 **Autenticación segura** con credenciales y proveedores sociales (Google, GitHub).
- 🗂️ **Gestión de recursos** educativos en un espacio centralizado.
- ✅ **Tareas y evaluaciones** integradas en el flujo de aprendizaje.
- 🎨 **UI moderna y responsive** gracias a [shadcn/ui](https://ui.shadcn.com/) y TailwindCSS.
- ⚡ **Backend robusto** con Prisma + PostgreSQL.
- 🌙 **Modo claro/oscuro** adaptable a la preferencia del usuario.

---

## 🛠️ Tecnologías usadas

- [Next.js](https://nextjs.org/) (App Router)
- [Prisma](https://www.prisma.io/) + PostgreSQL
- [NextAuth](https://next-auth.js.org/) para autenticación
- [shadcn/ui](https://ui.shadcn.com/) + [TailwindCSS](https://tailwindcss.com/) para la interfaz
- [TypeScript](https://www.typescriptlang.org/) para tipado estricto

---

## 🚀 Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/micro-learn.git

# 2. Entrar en el proyecto
cd micro-learn

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno
cp .env.example .env.local

# 5. Ejecutar migraciones de base de datos
npm prisma migrate dev

# 6. Levantar en modo desarrollo
npm dev
