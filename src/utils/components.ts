const classNames = (classNames: (string | undefined)[]) => {
  return classNames.filter((c) => c).join(' ');
};

export { classNames };
