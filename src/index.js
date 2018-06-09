//@flow
/**
 * Say Hi to (optionally) someone or by default, Roy
 *
 * @param who
 * @returns {string}
 */
export default function sayHi(who: string = 'Roy'): string {
	return `Hi ${who}`;
}
