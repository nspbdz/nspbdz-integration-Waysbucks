const { transaction, cart, order, product, toping, topingCart, topingOrder, user } = require("../../models");
const { Op } = require("sequelize");


exports.addTransaction = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    // const { toping: topingTitle, ...data } = req.body;
    //   const { ...data } = req.body;
    const idUser = req.user.id
    let data = req.body
    // console.log("req.body",data)
    console.log(data)
    // console.log(req)
    const attachment = req.file.filename
    const name=data.name
    const email=data.email
    const phone=data.phone
    const status=data.status
    const postCode=data.postCode
    const address=data.address
    const totals=data.total


    console.log(totals)
    console.log(attachment)

    const newTransaction = await transaction.create({
      idUser: idUser,
      status: "success",
      attachment:attachment,
      name:name,
      email:email,
      phone:phone,
      status:status,
      postCode:postCode,
      address:address,
      total:totals
    });

    let carts = await cart.findAll({
      where: {
        idUser: idUser,
      },
    })

    var idCarts = []
    var idProducts = []
    var quantity = []
    var subtotals = []

    carts.map(async (item) => {
      const { id, qty, subtotal, idProduct } = item;
      // console.log(id,qty,subtotal,idProduct)
      idCarts.push(id);
      idProducts.push(idProduct);
      quantity.push(qty);
      subtotals.push(subtotal);
    })
    console.log(subtotals)
    // console.log(quantity)
    // console.log(idProducts)
    // console.log(idCarts)
    // console.log(carts.length)

    let newOrdersData = []
    for (var i = 0; i < carts.length; i++) {
      let newOrders = await order.create({
        idProduct: idProducts,
        idTransaction: newTransaction.id,
        subtotal:subtotals ,
        qty: quantity,
      })
      newOrdersData.push(newOrders)
    }
    // console.log(newOrdersData)
    // let idOrders = []
    // newOrdersData.map(items =>{
    //   const { id } = items;
    // idOrders.push(id)
    // //   console.log("items",id)
    // })


    let topingCarts = await topingCart.findAll({
      where: {
        [Op.and]: idCarts
      }
    })

    newOrdersData.map(items => {
      const { id } = items;
      //   console.log("items",id)
      topingCarts.map(async (item) => {
        const { idToping } = item;
        // console.log(idToping)
        const newTopingOrders = await topingOrder.create({
          idOrder: id,
          idToping: idToping,
        })
      })

    })

    // await cart
    await cart.destroy({
      where: {
        idUser: idUser
      },
    });



    let transactions = await transaction.findOne({
      where: {
        // id: newTransaction.id
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

      ],
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    // orders = await order.findAll({
    //   where: {
    //     idTransaction: newTransaction.id
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
    //     {
    //       model: toping,
    //       as: "toping",
    //       through: {
    //         model: topingOrder,
    //         as: "bridge",
    //         attributes: [],
    //       },
    //       attributes: {
    //         exclude: ["createdAt", "updatedAt"],
    //       },
    //     },

    //   ],
    // })
    // // console.log(orders.length)
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
    //     toping: {
    //       ...items.toping,
    //       // image: path + items.product.image
    //     }
    //   }

    // })

    res.send({
      status: "success",
      message: "resource has successfully created",
      data: {
        // transactions, orders
        transactions
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




exports.getTransactions = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let transactions = await transaction.findAll({
      
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

exports.getDetailTransaction = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const { id } = req.params;
    let transactions = await transaction.findOne({
      where: {
        id,
      },

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },

      ],
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    let orders = await order.findAll({
      where: {
        idTransaction: transactions.id

      },
      attributes: {
        exclude: ["id", "productsId", "transactionsId", "createdAt", "updatedAt"],
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
    })

    transactions = JSON.parse(JSON.stringify(transactions))
    transactions = {
      ...transactions,
      attachment: transactions.attachment ? path + transactions.attachment : null,
    }

    parseJson = JSON.parse(JSON.stringify(orders))
    orders = parseJson.map(items => {
      console.log(path + items.product.image)
      return {
        ...items,
        product: {
          ...items.product,
          image: path + items.product.image

        }
      }

    })

    res.send({
      status: "success...",
      data: {
        transactions, orders
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
    // const attachment = req.file.filename
    // console.log(id)
    // console.log("image",image)
    data = {
      ...data,
      // attachment
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