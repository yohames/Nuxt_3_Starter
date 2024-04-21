import { jwtDecode } from "jwt-decode";
const cookie = useCookie("id_token");

let userData = jwtDecode(cookie.value) || null;

const role_ = ref(userData?.metadata?.role);

const client_ = ref("default");
const enabled_ = ref(true);

export default function (
  query,
  role = role_,
  client = client_,
  enabled = enabled_
) {
  const { mutate, onDone, loading, onError } = useMutation(query, () => ({
    fetchPolicy: "network-only",
    clientId: client.value,
    context: {
      headers: {
        "x-hasura-role": role.value,
      },
    },
  }));
  return {
    mutate,
    loading,
    onDone,
    onError,
  };
}
