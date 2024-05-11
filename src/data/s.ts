import {getComments} from '@/db/actions'

const main = async () => {
  const m = await getComments('sass')
  // console.log(m);
}
main()
