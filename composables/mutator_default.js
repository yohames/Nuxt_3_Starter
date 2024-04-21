const client_ = ref("default");

export default function (query, { client = client_ }) {
  const { mutate, onDone, loading, onError } = useMutation(query, () => ({
    fetchPolicy: "network-only",
    clientId: client.value,
    context: {},
  }));
  return {
    mutate,
    loading,
    onDone,
    onError,
  };
}
