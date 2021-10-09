const { transaction, cartOrder, cart, topingCart, order, product, toping, topingOrder, user } = require("../../models");

exports.addCart = async (req, res) => {
  const path = process.env.PATH_FILE
  const idProduct = req.params.id;

  // const { qty,subtotal } = req.body;
  const idUser = req.user.id


  console.log("idProduct", idProduct)
  console.log("idUser", idUser)
  let data = req.body

  console.log(data)


  var dataToping = []
  var quantity = 0
  var subtotals = 0
  data.map(async (item) => {
    const { topings, qty, subtotal } = item;
    console.log(item)
    dataToping = topings
    quantity = qty
    subtotals = subtotal
  })
  console.log("dataToping", dataToping)
  console.log("qty", quantity)
  console.log("subtotal", subtotals)

  try {


    let newCart = await cart.create({
      idProduct: idProduct,
      idUser: idUser,
      qty: quantity,
      subtotal: subtotals
    });
    dataToping.map(async (item) => {
      const { topings } = item;
      console.log("item", item)
      await topingCart.create({
        idCart: newCart.id,
        idToping: item,
      });
    });


    let carts = await cart.findAll({
      where: {
        id: newCart.id
        // id: 2
      },

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["id", "idProduct", "idUser", "createdAt", "updatedAt"],
          },
        },
        {
          model: toping,
          as: "toping",
          through: {
            model: topingCart,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },


      ],
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });
    // let cartOrders = await cartOrder.findAll({
    //   where: {
    //     idCart: newCart.id
    //   },
    //   attributes: {
    //     exclude: ["id", "productsId", "transactionsId", "createdAt", "updatedAt"],
    //   },
    //   include: [
    //     {
    //       model: product,
    //       as: "product",
    //       attributes: {
    //         exclude: ["id", "idProduct", "idUser", "createdAt", "updatedAt"],
    //       },
    //     },
    //     // {
    //     //   model: toping,
    //     //   as: "toping",
    //     //   through: {
    //     //     model: topingOrder,
    //     //     as: "bridge",
    //     //     attributes: [],
    //     //   },
    //     //   attributes: {
    //     //     exclude: ["createdAt", "updatedAt"],
    //     //   },
    //     // },

    //   ],
    // })
    // console.log(orders.length)
    // transactions = JSON.parse(JSON.stringify(transactions))
    // transactions = {
    //   ...transactions,
    //   attachment: transactions.attachment ? path + transactions.attachment : null,
    // }

    // parseJson = JSON.parse(JSON.stringify(orders))
    // orders = parseJson.map(items => {
    //   console.log(path + items.product.image)
    //   console.log(path + items.toping)

    //   return {
    //     ...items,
    //     product: {
    //       ...items.product,
    //       image: path + items.product.image
    //     },
    //     // toping: {
    //     //   ...items.toping,
    //     //   // image: path + items.product.image
    //     // }
    //   }

    // })

    res.send({
      status: "success",
      message: "resource has successfully created",
      data: {
        carts
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({

      status: "failed",
      message: "internal server error",
    });
  }
};

exports.getCarts = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let transactions = await cart.findAll({

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
        {
          model: order,
          as: "order",
          attributes: {
            exclude: ["idTransaction", "idProduct", "createdAt", "updatedAt", "idUser"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["id", "idProduct", "createdAt", "updatedAt"],
              },
            },
            {
              model: toping,
              as: "toping",
              through: {
                model: topingOrder,
                as: "bridge",
                attributes: [],
              },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },

          ],
        },
      ],
      attributes: {
        exclude: ["idUser", "password", "createdAt", "updatedAt"],
      },
    });
    transactions = JSON.parse(JSON.stringify(transactions))

    transactions = transactions.map((transaction) => {
      transaction = {
        ...transaction,
        attachment: transaction.attachment ? path + transaction.attachment : null,
        // photo: transaction.order.product.photo ? path + transaction.order.product.photo : null,

        order: transaction.order.map((items) => {
          orders = {
            ...items,
            product: {
              ...items.product,
              image: items.product.image ? path + items.product.image : null,

            },
          }
          return orders
        }),
      }
      return transaction

    })


    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUserCarts = async (req, res) => {
  const path = process.env.PATH_FILE
  const idUser = req.user.id

  try {
    let userCarts = await cart.findAll({
      where: {
        idUser: idUser,
      },

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["id", "idProduct", "idUser", "createdAt", "updatedAt"],
          },
        },
        {
          model: toping,
          as: "toping",
          through: {
            model: topingCart,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["idUser", "image", "price", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    userCarts = JSON.parse(JSON.stringify(userCarts))
    console.log(userCarts)
    userCarts = userCarts.map((userCart) => {
      userCarts = {
        ...userCart,
        product: {
          ...userCart.product,
          image: path + userCart.product.image
        }
      }

      return userCarts

    })
    res.send({
      status: "success...",
      data: {
        userCarts
      },
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let data = req.body
    const { id } = req.params;
    const idUser = req.user.id
    const attachment = req.file.filename
    // console.log(id)
    // console.log("image",image)
    data = {
      ...data,
      attachment
    }
    console.log(data)

    await transaction.update(data, {
      where: {
        id,
      },
    });
    let transactions = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });
    transactions = JSON.parse(JSON.stringify(transactions));
    res.send({
      status: "success...",
      data: {
        ...transactions,
        attachment: path + transactions.attachment,
      },
    });

  } catch (error) {
    // console.log(error)
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.destroy({
      where: {
        id,
      },
    });
    let transactions = await transaction.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete transaction id: ${id} finished`,
      data: {
        id: id
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUserTransaction = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const idUser = req.user.id

    let transactions = await transaction.findAll({
      where: {
        idUser: idUser
      },

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
        {
          model: order,
          as: "order",
          attributes: {
            exclude: ["idProduct", "idTransaction", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["id", "idProduct", "idUser", "createdAt", "updatedAt"],
              },
            },

            {
              model: topingProduct,
              as: "topingProduct",
              attributes: {
                exclude: ["idProduct", "createdAt", "idToping", "idOrder", "updatedAt"],
              },
              include: [
                {
                  model: toping,
                  as: "toping",
                  attributes: {
                    exclude: ["image", "price", "idUser", "idToping", "idOrder", "createdAt", "updatedAt"],
                  },
                }
              ]
            },
          ],
        },
      ],
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });


    transactions = JSON.parse(JSON.stringify(transactions))

    transactions = transactions.map((transaction) => {
      transaction = {
        ...transaction,
        attachment: transaction.attachment ? path + transaction.attachment : null,
        // photo: transaction.order.product.photo ? path + transaction.order.product.photo : null,

        order: transaction.order.map((items) => {
          orders = {
            ...items,
            product: {
              ...items.product,
              image: items.product.image ? path + items.product.image : null,

            },
          }
          return orders
        }),
      }
      return transaction

    })
    res.send({
      status: "success...",
      data: {
        transactions
      },
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};