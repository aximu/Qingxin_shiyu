
from langchain.llms import BaseLLM
from langchain.llms.base import LLM
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from typing import Any, List, Optional
from langchain.callbacks.manager import CallbackManagerForLLMRun

# 定义模型路径
model_path = './IEITYuan/Yuan2-2B-Mars-hf'
# 定义模型数据类型
torch_dtype = torch.bfloat16

# 定义源大模型类
class Yuan2_LLM(LLM):
    """
    class for Yuan2_LLM
    """
    tokenizer: AutoTokenizer = None
    model: AutoModelForCausalLM = None

    def __init__(self, mode_path :str):
        super().__init__()

        # 加载预训练的分词器和模型
        print("Creat tokenizer...")
        self.tokenizer = AutoTokenizer.from_pretrained(mode_path, add_eos_token=False, add_bos_token=False, eos_token='<eod>')
        self.tokenizer.add_tokens(['<sep>', '<pad>', '<mask>', '<predict>', '<FIM_SUFFIX>', '<FIM_PREFIX>', '<FIM_MIDDLE>','<commit_before>','<commit_msg>','<commit_after>','<jupyter_start>','<jupyter_text>','<jupyter_code>','<jupyter_output>','<empty_output>'], special_tokens=True)

        print("Creat model...")
        self.model = AutoModelForCausalLM.from_pretrained(mode_path, torch_dtype=torch.bfloat16, trust_remote_code=True).cuda()

    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
        **kwargs: Any,
    ) -> str:
        prompt = prompt.strip()
        prompt += "<sep>"
        inputs = self.tokenizer(prompt, return_tensors="pt")["input_ids"].cuda()
        outputs = self.model.generate(inputs,do_sample=False,max_length=4096)
        output = self.tokenizer.decode(outputs[0])
        response = output.split("<sep>")[-1].split("<eod>")[0]

        return response
    
    @property
    def _llm_type(self) -> str:
            return "Yuan2_LLM"

def main():
    from modelscope import snapshot_download
    model_dir = snapshot_download('IEITYuan/Yuan2-2B-Mars-hf', cache_dir='./')
    

if __name__ == "__main__":
    main()