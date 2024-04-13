import { cx } from "@/utils";

type TreeNode = FileNode | DirectoryNode;

type DirectoryNode = {
	name: string;
	type: "directory";
	children: TreeNode[];
};

type FileNode = {
	name: string;
	type: "file";
	size?: number;
};

type Props = {
	nodes: TreeNode[];
	className?: string;
};

export type SpriteProps = {
	className?: string;
};
const CornerDownRight = ({ className }: SpriteProps) => {
	return (
		<svg width="24" height="24" className={className} role="img" aria-label="CDR">
			<use href="/sprite.svg#corner" />
		</svg>
	);
};
const File = ({ className }: SpriteProps) => {
	return (
		<svg width="24" height="24" className={className} role="img" aria-label="FILE">
			<use href="/sprite.svg#file" />
		</svg>
	);
};
const FolderOpen = ({ className }: SpriteProps) => {
	return (
		<svg width="24" height="24" className={className} role="img" aria-label="FOLDER-OPEN">
			<use href="/sprite.svg#folder-open" />
		</svg>
	);
};

const isDirectory = (node: TreeNode): node is DirectoryNode => {
	return node.type === "directory";
};

const isFile = (node: TreeNode): node is FileNode => {
	return node.type === "file";
};

const humanFileSize = (size: number) => {
	const i: number = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	return `${(size / 1024 ** i).toFixed(2)} ${["B", "kB", "MB", "GB", "TB"][i]}`;
};

type FileSizeProps = {
	size?: number;
};

const FileSize = ({ size }: FileSizeProps) => {
	if (size === undefined || size === null) {
		return null;
	}
	return <span className="mr-2">({humanFileSize(size)})</span>;
};

type NodeProps = {
	node: TreeNode;
	depth: number;
};

const LeafNode = ({ node, depth }: NodeProps) => {
	const Icon = isDirectory(node) ? FolderOpen : File;
	return (
		<li className="flex gap-1">
			{depth > 0 ? (
				<div className="flex items-center justify-end" style={{ width: depth * 24 }}>
					<CornerDownRight className="w-6 text-stone-300 dark:text-stone-600" />
				</div>
			) : null}
			<Icon className="w-6" />
			<div className="flex w-full space-x-2 space-y-2 justify-between">
				<div>{node.name}</div>
				<div>{isFile(node) ? <FileSize size={node.size} /> : null}</div>
			</div>
		</li>
	);
};

const NonLeafNode = ({ node, depth }: NodeProps) => (
	<>
		<LeafNode node={node} depth={depth} />
		{isDirectory(node)
			? (node.children || []).map((c) => (
					<ul key={`${depth}_${c.name}`}>
						<NonLeafNode node={c} depth={depth + 1} />
					</ul>
				))
			: null}
	</>
);

const FileTree = ({ nodes, className }: Props) => (
	<div
		className={cx(
			"not-prose font-mono text-sm flex flex-col gap-2 overflow-x-scroll rounded-md border-2 border-stone-300 p-5 shadow-md dark:border-stone-700",
			className,
		)}
	>
		<ul className={"flex min-w-[460px] flex-col gap-2"}>
			{nodes.map((n) => (
				<NonLeafNode key={n.name} node={n} depth={0} />
			))}
		</ul>
	</div>
);

export default FileTree;
