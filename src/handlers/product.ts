import prisma from "../db";

export const getProducts = async (req, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { Product: true },
  });

  res.json({ data: { products: user.Product } });
};

export const getOneProduct = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: { id: req.params.id, belongsToId: req.user.id },
  });

  res.json({ data: { product } });
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: { product } });
};

// export const updateProduct = async (req, res) => {
//   const updated = await req.prisma.update({
//     where: { id_belongsToId: { id: req.params.id, belongsToId: req.user.id } },
//     data: {
//       name: req.body.name,
//     },
//   });
//   res.json({ data: { updated } });
// };

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: { id_belongsToId: { id: req.params.id, belongsToId: req.user.id } },
  });

  res.json({ data: { deleted } });
};
