import type {
  IToastivaData,
  TToastivaHorizontalAlign,
  TToastivaPosition,
  TToastivaPositionInput,
  TToastivaVerticalPosition,
} from "../typings";
import {
  ToastivaHorizontalAlign,
  ToastivaPosition,
  ToastivaVerticalPosition,
} from "../typings";

const TOASTIVA_POSITIONS = Object.values(
  ToastivaPosition,
) as TToastivaPosition[];

function getDefaultVertical(
  position: TToastivaPositionInput,
): TToastivaVerticalPosition {
  return position.startsWith(ToastivaVerticalPosition.Top)
    ? ToastivaVerticalPosition.Top
    : ToastivaVerticalPosition.Bottom;
}

function getHorizontalPosition(
  position: TToastivaPosition,
): TToastivaHorizontalAlign {
  if (position.endsWith(ToastivaHorizontalAlign.Right)) {
    return ToastivaHorizontalAlign.Right;
  }

  if (position.includes(ToastivaHorizontalAlign.Center)) {
    return ToastivaHorizontalAlign.Center;
  }

  return ToastivaHorizontalAlign.Left;
}

function resolveToastStackPosition(
  basePosition: TToastivaPosition,
  position?: TToastivaPositionInput,
): TToastivaPosition {
  if (position && TOASTIVA_POSITIONS.includes(position as TToastivaPosition)) {
    return position as TToastivaPosition;
  }

  const nextVertical = position ?? getDefaultVertical(basePosition);
  const horizontal = getHorizontalPosition(basePosition);
  return `${nextVertical}-${horizontal}` as TToastivaPosition;
}

function filterToastsForPosition(
  toasts: IToastivaData[],
  basePosition: TToastivaPosition,
  position: TToastivaPosition,
) {
  return toasts.filter(
    (toast) =>
      resolveToastStackPosition(basePosition, toast.position) === position,
  );
}

export {
  filterToastsForPosition,
  getDefaultVertical,
  getHorizontalPosition,
  resolveToastStackPosition,
  TOASTIVA_POSITIONS,
};
