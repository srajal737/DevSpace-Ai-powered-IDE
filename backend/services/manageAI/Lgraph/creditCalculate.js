
const INPUT_PRICE = 200;  //  per 1M tokens
const OUTPUT_PRICE = 500; // ₹per 1M tokens

const CREDITS_PER_INR = 100;

export const calculateCost = (usage) => {

    const inputCost =
        (usage.input_tokens / 1000000) *
        INPUT_PRICE;

    const outputCost =
        (usage.output_tokens / 1000000) *
        OUTPUT_PRICE;

    const totalCostINR = inputCost + outputCost;

    const totalCredits = Math.ceil(
        totalCostINR * CREDITS_PER_INR
    );

    return {
        inputCost,
        outputCost,
        totalCostINR,
        totalCredits
    };
};
