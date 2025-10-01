import type { MDXComponents } from 'mdx/types'
import ProblemCard from '@/components/ui/ProblemCard'
import SolutionToggle from '@/components/ui/SolutionToggle'
import InlineProblem from '@/components/ui/InlineProblem'
import Remark from '@/components/ui/Remark'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ProblemCard,
    SolutionToggle,
    InlineProblem,
    Remark,
  }
}
