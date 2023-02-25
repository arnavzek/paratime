function getCookie(name) {
  return (
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""
  );
}

export default getCookie;
