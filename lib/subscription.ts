type UserWithPlan = {
  plan: string;
  trialEndsAt: Date | string | null;
  stripeCurrentPeriodEnd: Date | string | null;
};

export function isTrialActive(user: UserWithPlan): boolean {
  return user.plan === "TRIAL" && !!user.trialEndsAt && new Date(user.trialEndsAt) > new Date();
}

export function isSubscribed(user: UserWithPlan): boolean {
  return user.plan === "PRO" && !!user.stripeCurrentPeriodEnd && new Date(user.stripeCurrentPeriodEnd) > new Date();
}

export function hasAccess(user: UserWithPlan): boolean {
  return isTrialActive(user) || isSubscribed(user);
}

export function daysLeftInTrial(user: UserWithPlan): number {
  if (!user.trialEndsAt) return 0;
  const diff = new Date(user.trialEndsAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export const PLAN_LIMITS = {
  FREE: {
    invoicesPerMonth: 5,
    pixCobrancas: false,
    dasAutomatico: false,
    dasnSimei: false,
  },
  TRIAL: {
    invoicesPerMonth: Infinity,
    pixCobrancas: true,
    dasAutomatico: true,
    dasnSimei: true,
  },
  PRO: {
    invoicesPerMonth: Infinity,
    pixCobrancas: true,
    dasAutomatico: true,
    dasnSimei: true,
  },
} as const;
