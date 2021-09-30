export function toBase(file) {
  let reader = new FileReader();
  let res = reader.readAsDataURL(file);
  setTimeout(() => {
    return res;
  });
}
