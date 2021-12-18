export const enhance = (form: HTMLFormElement, { result }) => {
  // Form Mounted
  const handleSumbit = async (e: Event) => {
    e.preventDefault(); //sending to backend

    try {
      const body = new FormData(form);
      const res = await fetch(form.action, {
        method: form.method,
        headers: {
          accept: "application/json",
        },
        body,
      });

      if (res.ok) {
        console.log("API RESPONSE");
        result(res);
      } else {
        console.log("FETCH ERROR :- ", res.text());
      }
    } catch (error) {
      console.error("FORM ERRROR :-", error);
    }
  };

  form.addEventListener("sumbit", handleSumbit);

  return {
    destroy() {
      form.removeEventListener("submit", handleSumbit);
    },
  };
};
