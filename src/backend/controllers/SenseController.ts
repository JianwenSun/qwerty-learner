import { Router } from 'express';
import type { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { SenseService } from '../service/SenseService';
import { SenseSaveDto } from '../dto/SenseSaveDto';
import { SenseUpdateDto } from '../dto/SenseUpdateDto';

const router = Router();
const senseService = new SenseService();

/**
 * 保存语义
 * POST /api/sense
 */
router.post('/',
  // 校验请求体
  body('content').notEmpty().withMessage('语义内容不能为空'),
  body('pos').notEmpty().withMessage('词性不能为空'),
  body('sensesId').notEmpty().isNumeric().withMessage('句子ID不能为空且必须是数字'),
  async (req: Request, res: Response) => {
    try {
      // 检查验证结果
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map(e => e.msg)
        });
      }

      // 创建 SenseInput 对象
      const input = req.body as SenseSaveDto;
      // 存储语义
      const sense = await senseService.saveSense(input);
      res.status(201).json(sense);
    } catch (error) {
      console.error('保存语义失败:', error);
      res.status(500).json({ error: '保存语义失败' });
    }
  }
);

/**
 * 根据ID查询语义
 * GET /api/sense/:id
 */
router.get('/:id',
  // 校验参数
  param('id').notEmpty().isNumeric().withMessage('语义ID不能为空且必须是数字'),
  async (req: Request, res: Response) => {
    try {
      // 检查验证结果
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map(e => e.msg)
        });
      }

      const { id } = req.params;
      const sense = await senseService.getSenseById(Number(id));

      if (!sense) {
        return res.status(404).json({ error: '语义不存在' });
      }

      res.json(sense);
    } catch (error) {
      console.error('查询语义失败:', error);
      res.status(500).json({ error: '查询语义失败' });
    }
  }
);

/**
 * 根据Senses ID查询语义列表
 * GET /api/sense/:sensesId
 */
router.get('/sense/:sensesId',
  // 校验参数
  param('sensesId').notEmpty().isNumeric().withMessage('Senses ID不能为空且必须是数字'),
  async (req: Request, res: Response) => {
    try {
      // 检查验证结果
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map(e => e.msg)
        });
      }

      const { sensesId } = req.params;
      const senses = await senseService.getSensesBySensesId(Number(sensesId));
      res.json(senses);
    } catch (error) {
      console.error('查询句子语义失败:', error);
      res.status(500).json({ error: '查询句子语义失败' });
    }
  }
);

/**
 * 查询所有语义
 * GET /api/sense
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const senses = await senseService.getAllSenses();
    res.json(senses);
  } catch (error) {
    console.error('查询所有语义失败:', error);
    res.status(500).json({ error: '查询所有语义失败' });
  }
});

/**
 * 更新语义
 * PUT /api/sense/:id
 */
router.put('/:id',
  // 校验参数
  param('id').notEmpty().isNumeric().withMessage('语义ID不能为空且必须是数字'),
  // 校验请求体
  body('content').notEmpty().withMessage('语义内容不能为空'),
  body('pos').optional().isString().withMessage('词性必须是字符串'),
  async (req: Request, res: Response) => {
    try {
      // 检查验证结果
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map(e => e.msg)
        });
      }

      const { id } = req.params;
      // 更新语义
      const updateDto = req.body as SenseUpdateDto;
      const sense = await senseService.updateSense(Number(id), updateDto);
      res.json(sense);
    } catch (error) {
      console.error('更新语义失败:', error);
      res.status(500).json({ error: '更新语义失败' });
    }
  }
);

/**
 * 删除语义
 * DELETE /api/sense/:id
 */
router.delete('/:id',
  // 校验参数
  param('id').notEmpty().isNumeric().withMessage('语义ID不能为空且必须是数字'),
  async (req: Request, res: Response) => {
    try {
      // 检查验证结果
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map(e => e.msg)
        });
      }

      const { id } = req.params;
      const sense = await senseService.deleteSense(Number(id));
      res.json(sense);
    } catch (error) {
      console.error('删除语义失败:', error);
      res.status(500).json({ error: '删除语义失败' });
    }
  }
);

export default router;
