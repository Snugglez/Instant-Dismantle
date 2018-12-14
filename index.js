module.exports = function InstantDismantle(d) {
let enabled = true

d.command.add("instaD", {
$default() {
enabled = !enabled
d.command.message(`[${enabled ? 'enabled' : 'disabled'}].`)
}
})

d.hook('C_RQ_START_SOCIAL_ON_PROGRESS_DECOMPOSITION', 1, (e) =>{
if(!enabled) return
d.send('C_RQ_COMMIT_DECOMPOSITION_CONTRACT', 1, {
contract: e.contract,
})
return false //not needed probably ¯\_(ツ)_/¯
})
}