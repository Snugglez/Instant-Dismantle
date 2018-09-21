module.exports = function InstantDismantle(d) {
let id = null,
	dbid = null,
	amount = null,
	enabled = true

d.command.add("instaD", {
$default() {
enabled = !enabled
d.command.message(`[${enabled ? 'enabled' : 'disabled'}].`)
}
})

d.hook('S_SHOW_ITEM_TOOLTIP', 9, event => {
id = event.id
dbid = event.dbid
amount = event.amount
})
d.hook('S_REQUEST_CONTRACT', 1, event => {
if(!enabled || !d.game.me.is(event.senderId) || event.type != 89) return
d.send('C_REQUEST_DECOMPOSITION', 1, {
contract: event.id,
id: id,
dbid: dbid,
amount: amount
})
process.nextTick(() => {
d.send('S_CANCEL_CONTRACT', 1, { type: 89, id: event.id })
d.hookOnce('S_CANCEL_CONTRACT', 1, event => { if(event.type == 89) return false})
})
})
}