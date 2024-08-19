import { TOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const createANewOrder = async (orderData: TOrder) => {
  return await OrderModel.create(orderData);
};
const getAllOrdersFromDB = async (query: string | undefined) => {
  const filter = query ? { email: query } : {};
  return await OrderModel.find(filter);
};

export const OrderServices = {
  createANewOrder,
  getAllOrdersFromDB,
};
