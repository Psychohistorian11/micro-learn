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
  areas: {
    select: { id: true, name: true }, // porque en el DTO son string[]
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
