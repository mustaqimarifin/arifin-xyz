import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment, deleteComment } from '@/db/actions'

export const useComments = () => {
  const queryClient = useQueryClient()
  const refresh = () =>
    queryClient.invalidateQueries({
      type: 'active',
      refetchType: 'active',
      queryKey: ['comments'],
    })

  const createComment = useMutation({
    mutationFn: addComment,
    async onSuccess() {
      await refresh()
    },
  })

  const delComment = useMutation({
    mutationFn: deleteComment,
    async onSuccess() {
      await refresh()
    },
  })

  /*  const editComment = useMutation({
    mutationFn: updateComment,
    async onSuccess() {
      await refresh()
    },
  })
 */
  return {
    createComment,
    delComment,
    //editComment,
  }
}
