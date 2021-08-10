/**
 * Function to stall time. Useful for simulating slow load times.
 * @param stallTime Time (ms) to stall for.
 */
async function staller(stallTime = 3000): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

export default staller;
