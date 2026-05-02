import type { IUseToastEffectsParams } from "../typings";
import { useEffect, useRef } from "react";
import {
  cancelAnimation,
  Easing,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  getBodyFadeDelay,
  getBodyFadeDuration,
  getCollapseDuration,
  getExpandDuration,
  getProgressDuration,
} from "../utils/toast-timing";

function useToastEffects(params: IUseToastEffectsParams) {
  const {
    bodyWidth,
    bodyRadius,
    animationConfig,
    collapsedCardHeight,
    collapsedOffset,
    expanded,
    expandedHeight,
    expandedOffset,
    hasBody,
    isDismissing,
    isFront,
    isMeasured,
    isTop,
    morphMode = false,
    pillWidth,
    springConfig,
    shouldAutoExpand,
    shouldShowExpandedBody,
    stackDepth,
    toast,
    values,
  } = params;
  const collapseDuration = getCollapseDuration(toast);
  const expandDuration = getExpandDuration(toast);
  const bodyFadeDelay =
    animationConfig.morph.bodyFadeDelay ?? getBodyFadeDelay(toast);
  const bodyFadeDuration =
    animationConfig.morph.bodyFadeDuration ?? getBodyFadeDuration(toast);
  const descriptionSpringDelay =
    animationConfig.morph.descriptionDelay ?? bodyFadeDelay;
  const actionSpringDelay =
    bodyFadeDelay + animationConfig.morph.actionDelay;
  const squishDelay =
    animationConfig.morph.squishDelay ??
    Math.max(24, Math.round(expandDuration * 0.08));
  const dimensionsReady = useRef(false);
  const firstRealMeasureApplied = useRef(false);
  const compactSignature = useRef<string | null>(null);
  const previousExpandedInStack = useRef(false);

  useEffect(() => {
    if (!dimensionsReady.current || !firstRealMeasureApplied.current) {
      values.pillWidth.value = pillWidth;
      values.bodyWidth.value = bodyWidth;
      values.bodyRadius.value = bodyRadius;
      values.collapsedHeight.value = collapsedCardHeight;
      values.expandedHeight.value = expandedHeight;
      dimensionsReady.current = true;
      if (isMeasured) {
        firstRealMeasureApplied.current = true;
      }
      return;
    }

    // Sileo holds the previous pill width while the new content is still
    // being measured (its `pillWidth` state stays at the last measured value
    // until the next ResizeObserver tick). Without this gate, a morph swap
    // animates pillWidth to the title-length *estimate* first, then springs
    // again to the real measurement. That's the "shrink to a square then
    // round out" pop the user sees right after a state change.
    if (!isMeasured) return;

    const shouldAnimateExpandedUpdate = hasBody && shouldShowExpandedBody;
    const shouldAnimateDimensions = morphMode || shouldAnimateExpandedUpdate;
    // In morph mode, use the same spring config as morphProgress so all values
    // settle together (Sileo-style unified animation).
    const dimensionSpring = morphMode
      ? springConfig.morph
      : springConfig.pillResize;
    const dimensionTiming = {
      duration: expandDuration,
      easing: Easing.out(Easing.cubic),
    };

    values.bodyWidth.value = shouldAnimateDimensions
      ? morphMode
        ? withSpring(bodyWidth, dimensionSpring)
        : withTiming(bodyWidth, dimensionTiming)
      : bodyWidth;
    values.bodyRadius.value = shouldAnimateDimensions
      ? morphMode
        ? withSpring(bodyRadius, dimensionSpring)
        : withTiming(bodyRadius, dimensionTiming)
      : bodyRadius;
    values.expandedHeight.value = shouldAnimateDimensions
      ? morphMode
        ? withSpring(expandedHeight, dimensionSpring)
        : withTiming(expandedHeight, dimensionTiming)
      : expandedHeight;
    values.pillWidth.value =
      shouldAnimateDimensions && !morphMode
        ? withTiming(pillWidth, dimensionTiming)
        : withSpring(pillWidth, dimensionSpring);
    values.collapsedHeight.value =
      shouldAnimateDimensions && !morphMode
        ? withTiming(collapsedCardHeight, dimensionTiming)
        : withSpring(collapsedCardHeight, dimensionSpring);
  }, [
    bodyWidth,
    bodyRadius,
    collapsedCardHeight,
    expandDuration,
    expandedHeight,
    hasBody,
    isMeasured,
    morphMode,
    pillWidth,
    values.bodyWidth,
    values.bodyRadius,
    values.collapsedHeight,
    values.expandedHeight,
    values.pillWidth,
    shouldShowExpandedBody,
    springConfig,
  ]);

  // Sileo's `ready` flag pattern: hold the mount animation at 0 (invisible +
  // off-screen, via cardStyle) until the first real measurement is applied.
  // Without this gate the toast renders one frame at the estimated/default
  // pill width before the measured width arrives. That frame is the
  // "square box that then rounds" flash the user sees on first show.
  const mountStartedRef = useRef(false);
  useEffect(() => {
    if (mountStartedRef.current) return;
    if (!isMeasured) return;
    mountStartedRef.current = true;
    values.mountProgress.value = withTiming(1, {
      duration: animationConfig.mount.duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [animationConfig.mount.duration, isMeasured, values]);

  useEffect(() => {
    if (toast.type !== "error") return;
    values.shakeX.value = withSequence(
      withTiming(3, { duration: 50 }),
      withTiming(-3, { duration: 50 }),
      withTiming(2, { duration: 50 }),
      withTiming(-2, { duration: 50 }),
      withTiming(1, { duration: 50 }),
      withTiming(0, { duration: 50 }),
    );
  }, [toast.type, values.shakeX]);

  useEffect(() => {
    if (!dimensionsReady.current || hasBody || morphMode) return;
    const nextSignature = `${toast.type}:${toast.title}:${pillWidth}`;
    if (compactSignature.current === null) {
      compactSignature.current = nextSignature;
      return;
    }
    if (compactSignature.current === nextSignature) return;
    compactSignature.current = nextSignature;
    cancelAnimation(values.squishY);
    cancelAnimation(values.squishX);
    values.squishY.value = withSequence(
      withTiming(animationConfig.compact.squishScaleY, {
        duration: animationConfig.compact.squishDuration,
      }),
      withSpring(1, springConfig.squish),
    );
    values.squishX.value = withSequence(
      withTiming(animationConfig.compact.squishScaleX, {
        duration: animationConfig.compact.squishDuration,
      }),
      withSpring(1, springConfig.squish),
    );
  }, [
    hasBody,
    morphMode,
    pillWidth,
    springConfig,
    animationConfig.compact.squishDuration,
    animationConfig.compact.squishScaleX,
    animationConfig.compact.squishScaleY,
    toast.title,
    toast.type,
    values.squishX,
    values.squishY,
  ]);

  useEffect(() => {
    cancelAnimation(values.morphProgress);
    cancelAnimation(values.bodyOpacity);
    cancelAnimation(values.descriptionProgress);
    cancelAnimation(values.actionProgress);
    cancelAnimation(values.squishY);
    cancelAnimation(values.squishX);

    if (shouldShowExpandedBody) {
      values.morphProgress.value = morphMode
        ? withSpring(1, springConfig.morph)
        : withTiming(1, {
            duration: expandDuration,
            easing: Easing.out(Easing.cubic),
          });
      values.bodyOpacity.value = withDelay(
        bodyFadeDelay,
        withTiming(1, {
          duration: bodyFadeDuration,
          easing: Easing.out(Easing.cubic),
        }),
      );
      values.descriptionProgress.value = withDelay(
        descriptionSpringDelay,
        withSpring(1, springConfig.bodyReveal),
      );
      values.actionProgress.value = withDelay(
        actionSpringDelay,
        withSpring(1, springConfig.bodyReveal),
      );
      values.squishY.value = withDelay(
        squishDelay,
        withSequence(
          withTiming(animationConfig.morph.squishScaleY, {
            duration: animationConfig.morph.squishDuration,
          }),
          withSpring(1, springConfig.squish),
        ),
      );
      values.squishX.value = withDelay(
        squishDelay,
        withSequence(
          withTiming(animationConfig.morph.squishScaleX, {
            duration: animationConfig.morph.squishDuration,
          }),
          withSpring(1, springConfig.squish),
        ),
      );
      return;
    }
    // Sileo-style collapse: content fades out fast (≈ 0.08 * shape duration),
    // shape contracts on a single unified spring so morphProgress, squish and
    // dimensions all settle on the same curve. Using withSpring (instead of a
    // bezier timing) gives the soft overshoot/settle that makes the collapse
    // feel like the shape is breathing back into the pill rather than easing
    // along a fixed curve.
    const collapseShapeDuration = getSmoothCollapseDuration(
      animationConfig.morph.collapseDuration,
    );
    const contentFadeDuration = Math.max(
      80,
      Math.round(collapseShapeDuration * 0.18),
    );
    const contentSettleDuration = Math.max(
      140,
      Math.round(collapseShapeDuration * 0.45),
    );
    values.bodyOpacity.value = withTiming(0, {
      duration: contentFadeDuration,
      easing: Easing.out(Easing.quad),
    });
    values.descriptionProgress.value = withTiming(0, {
      duration: contentSettleDuration,
      easing: Easing.out(Easing.cubic),
    });
    values.actionProgress.value = withTiming(0, {
      duration: contentSettleDuration,
      easing: Easing.out(Easing.cubic),
    });
    values.squishY.value = withSpring(1, springConfig.morph);
    values.squishX.value = withSpring(1, springConfig.morph);
    values.morphProgress.value = withSpring(0, springConfig.morph);
  }, [
    bodyFadeDelay,
    bodyFadeDuration,
    collapseDuration,
    expandDuration,
    actionSpringDelay,
    animationConfig.morph.collapseDuration,
    animationConfig.morph.squishDuration,
    animationConfig.morph.squishScaleX,
    animationConfig.morph.squishScaleY,
    descriptionSpringDelay,
    springConfig,
    values.actionProgress,
    values.bodyOpacity,
    values.descriptionProgress,
    values.morphProgress,
    values.squishX,
    values.squishY,
    shouldShowExpandedBody,
    squishDelay,
  ]);

  useEffect(() => {
    const expandedInStack =
      !isDismissing && (expanded || shouldShowExpandedBody);
    const wasExpandedInStack = previousExpandedInStack.current;
    const isCollapsingExpandedStack =
      wasExpandedInStack && !expandedInStack && !isDismissing;
    previousExpandedInStack.current = expandedInStack;
    const nextHeight = expandedInStack ? expandedHeight : collapsedCardHeight;
    const nextTranslate =
      (expandedInStack ? expandedOffset : collapsedOffset) * (isTop ? 1 : -1);
    const nextScale = expandedInStack
      ? 1
      : Math.max(
          animationConfig.stack.minScale,
          1 - stackDepth * animationConfig.stack.scaleStep,
        );
    const nextOpacity = expandedInStack
      ? 1
      : Math.max(
          animationConfig.stack.minOpacity,
          0.94 - stackDepth * animationConfig.stack.opacityStep,
        );
    // Single timing curve across all four stack properties so the reshuffle
    // settles in one frame instead of three (Y/scale/height on a spring,
    // opacity on a 180ms timing). Matched to the 420ms mount duration so
    // a new toast lands as the existing stack finishes making room.
    const stackAnim = {
      duration: animationConfig.stack.duration,
      easing: Easing.out(Easing.cubic),
    };
    // Sileo collapses the shell on the same spring as the morph so the height
    // retraction breathes with the path's shape change instead of running on a
    // separate bezier and finishing a beat earlier.
    const stackTiming = (toValue: number) =>
      isCollapsingExpandedStack
        ? withSpring(toValue, springConfig.morph)
        : withTiming(toValue, stackAnim);

    values.stackY.value = stackTiming(nextTranslate);
    values.stackScale.value = stackTiming(nextScale);
    values.stackOpacity.value = stackTiming(nextOpacity);
    values.shellHeight.value = stackTiming(nextHeight);
  }, [
    collapsedCardHeight,
    collapsedOffset,
    expanded,
    expandedHeight,
    expandedOffset,
    isDismissing,
    isFront,
    isTop,
    springConfig,
    animationConfig.stack.duration,
    animationConfig.stack.minOpacity,
    animationConfig.stack.minScale,
    animationConfig.stack.opacityStep,
    animationConfig.stack.scaleStep,
    animationConfig.morph.collapseDuration,
    shouldShowExpandedBody,
    stackDepth,
    values,
  ]);

  useEffect(() => {
    values.progress.value = withTiming(1, {
      duration: getProgressDuration(toast, hasBody, shouldAutoExpand),
      easing: Easing.linear,
    });
  }, [hasBody, shouldAutoExpand, toast, values.progress]);
}

function getSmoothCollapseDuration(duration: number) {
  return Math.max(260, duration);
}

export { useToastEffects };
