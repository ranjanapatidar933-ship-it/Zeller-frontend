import { useEffect, useState } from "react";
import { runQuery } from "../api/graphqlClient";
import { ListZellerCustomers } from "../graphql/queries";
import type { Customer } from "../types/customer";
import { ERRORS } from "../constants/error";


export function useCustomers(): { customers: Customer[]; loading: boolean } {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function load() {
      try {
        const data = await runQuery(ListZellerCustomers);

        const normalized: Customer[] = data.listZellerCustomers.items.map(
          (c: Customer) => ({
            ...c,
            role: c.role.toLowerCase(),
          })
        );

        setCustomers(normalized);
      } catch (err) {
        console.error(ERRORS.FETCH_ERROR, err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { customers, loading };
}
