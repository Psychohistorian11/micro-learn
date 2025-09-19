// somewhere central, e.g. /lib/prisma-selects.ts
export const resourceSelect = {
  id: true,
  title: true,
  isPublic: true,
  image: true,
  description: true,
  attachment: true,
  type: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
  areas: { // SOLVED: EL ERROR ESTÁ AQUÍ, ANTES SOLO ESTABA EL ID DEL AREA, AHORA SELECCIONA EL ID Y NAME, ESE ES EL ERROR, QUE MANDA UN OBJETO AREA.AREA.ID, mirar en resource-card
    select: {
      area: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  communities: {
    select: { id: true },
  },
};

export const userSelect = {
  id: true,
  username: true,
  email: true,
  profilePicture: true,
  description: true,
  resources: {
    select: { id: true },
  },
};
