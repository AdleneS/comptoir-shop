import { getSizeLabel } from "@/utils/SizeHandler";

export const useSizes = (product: Ref<any>) => {
  const sizes = computed(() => {
    return product.value?.skus.map((s: any) => ({
      value: s.size.value,
      label: getSizeLabel(s.size.value),
    }));
  });

  return { sizes };
};

export const getSizeLabelFromItem = (item: any) => {
  return sizeMap[item?.size] ?? item?.size ?? null;
};
