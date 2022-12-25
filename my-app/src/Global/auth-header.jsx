export default function authHeader() {
  const user = localStorage.getItem("ssn");
  if (user) {
    return { Authorization: `${user}` };
  } else {
    return {};
  }
}
