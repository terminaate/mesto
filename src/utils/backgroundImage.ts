export default (str: string, size?: number | string) => {
  return {
    backgroundImage: size ? `url(${str + '&size=' + size})` : `url(${str})`,
  };
};
