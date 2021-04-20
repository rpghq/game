export type SystemHandler<TResources, TTrigger, TResult> = (
  resources: TResources,
  trigger: TTrigger,
) => TResult | Promise<TResult>;

export function system(): unknown {
  return 1;
}
