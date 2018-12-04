

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
      alert(err.message);
    },
  },
};

