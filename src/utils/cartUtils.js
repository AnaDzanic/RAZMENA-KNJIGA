const MONTHLY_FEE = 9.99;
const LATE_FEE = 5.00;
const DAMAGE_FEE = 20.00;

export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    state.membershipPrice = addDecimal(MONTHLY_FEE);
    state.startDate = state.startDate || null;
    state.duration = state.duration || null;

    state.lateFee = state.daysLate > 0 
        ? addDecimal(state.daysLate * LATE_FEE) 
        : addDecimal(0);

    state.damageFee = state.isBookDamaged 
        ? addDecimal(DAMAGE_FEE) 
        : addDecimal(0);

    state.totalPrice = addDecimal(
        Number(state.membershipPrice) + 
        Number(state.lateFee) + 
        Number(state.damageFee)
    );

    localStorage.setItem('cart', JSON.stringify(state));
    
    return state;
}