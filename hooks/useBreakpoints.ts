import useScreenSize from "./useScreenSize";

export default function useBreakpoints() {
  const { width } = useScreenSize();

  const isSm = width >= 680;
  const isMd = width >= 768;
  const isLg = width >= 1024;
  const isXl = width >= 1280;
  const is2xl = width >= 1400;

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
  };
}
