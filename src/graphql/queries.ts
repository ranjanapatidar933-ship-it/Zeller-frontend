export const ListZellerCustomers =  `
  query ListZellerCustomers {
    listZellerCustomers {
      items {
        id
        name
        email
        role
      }
    }
  }
`;
